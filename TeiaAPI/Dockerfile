# Stage 1: Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# EXPOSE 8081

# restore
COPY ["./TeiaAPI.csproj", "./"]
RUN dotnet restore "./TeiaAPI.csproj"

#build
COPY ["./", "./"]
WORKDIR /src
RUN dotnet build "./TeiaAPI.csproj" -c Release -o /app/build

# Stage 2: publish Stage
FROM build AS publish
RUN dotnet publish "./TeiaAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
ENV ASPNETCORE_HTTP_PORTS=5001
EXPOSE 5001
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TeiaAPI.dll"]


