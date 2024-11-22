# Contain the Activities

## Add IdentityDbContext

- Once you add the inheritance from IdentityDbContext<AppUser>  you need to create a new migration 
- to do so:
- Stop API
- Go to root folder

- if in PS C:\Dev\Repos\sandbox\Reactivities\API> cd ..

```bash
cd ..
```

- Create new migration

```bash
dotnet ef migrations add IdentityAdded -p Persistence -s API
```

## Reset from scratch DB and migrations

```bash
dotnet ef database update 0 [ --context DataContext ] -s API -p Persistence
```
remove table from db DotnetStarter].[dbo].[__EFMigrationsHistory]
remove files in folder migration

```bash
dotnet ef migrations add Initialize -s API -p Persistence 
```

```bash
dotnet ef database update -s API -p Persistence 
```

- result
- ![alt text](readme-resources\initializeddb.png)
- 