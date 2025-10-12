# jmrcmdng.github.io

[![.NET](https://img.shields.io/badge/.NET-8.0-blueviolet?logo=dotnet)](https://dotnet.microsoft.com/)  
[![MudBlazor](https://img.shields.io/badge/UI-MudBlazor-blue?logo=blazor)](https://mudblazor.com/)  
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)  
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Personal portfolio built with Blazor WebAssembly + MudBlazor**  
> Fully static site deployed through **GitHub Pages** to showcase my projects, skills, and profile.  
>  
> 🌐 **Live:** [https://jmrcmdng.github.io](https://jmrcmdng.github.io)
---

## ⚙️ Tech Stack

- **Framework:** .NET 8 (Blazor WebAssembly)  
- **UI Library:** MudBlazor  
- **Language:** C#, Razor, HTML, CSS  
- **Hosting:** GitHub Pages  
- **Backend API:** Private .NET 8 API (CMDNG.API)  
- **Database:** Supabase (PostgreSQL + REST API)

---

## 🧩 Features

- Responsive, modern UI powered by **MudBlazor**  
- Fully static WebAssembly deployment — no server hosting required  
- Connected to a **private API** for dynamic content updates  
- **JWT-based authentication** for secure API access  
- **CORS policy** configured for safe client-side communication  
- Backed by a **Supabase database** for managing content dynamically  
- Fast, lightweight, and easy to maintain  

---

## 🧱 Architecture Overview
jmrcmdng.github.io (Blazor WASM)
│
▼
CMDNG.API (.NET 8 Web API)
│
▼
Supabase (PostgreSQL)

### 🔒 API Security (Private Repo: CMDNG.API)

The API implements **JWT Authentication** with key validation:
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JsonWebToken:Issuer"],
            ValidAudience = builder.Configuration["JsonWebToken:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JsonWebToken:Key"]))
        };
    });
CORS is configured dynamically via configuration file:
csharpbuilder.Services.AddCors(options =>
{
    options.AddPolicy("WebPolicy", policy =>
    {
        var origins = builder.Configuration["Cors:Origins"]
            .Split(',', StringSplitOptions.RemoveEmptyEntries);

        policy.WithOrigins(origins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

## 🛠 Local Setup
Clone and run the static Blazor app locally:
bashgit clone https://github.com/zyonify/jmrcmdng.github.io.git
cd jmrcmdng.github.io
dotnet restore
dotnet run
⚠️ The connected API (CMDNG.API) is private and not required for local static builds unless dynamic content editing is needed.

## 📡 Related Repositories
RepositoryDescriptionjmrcmdng.github.ioPublic Blazor WebAssembly frontend (this repo)CMDNG.API (Private).NET 8 API handling authentication, content updates, and database operations

## 📜 License
This project is licensed under the MIT License.