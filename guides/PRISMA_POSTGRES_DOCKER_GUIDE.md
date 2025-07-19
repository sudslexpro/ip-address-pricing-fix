# Prisma Postgres Local Server Setup with Docker CLI

This guide shows you how to set up a local PostgreSQL database server using Docker CLI commands for the Lex Protector Portal TypeScript project with Prisma ORM.

## Prerequisites

- Docker installed and running on your system
- Node.js and yarn package manager
- Basic understanding of Docker and Prisma

## Docker CLI Setup

### Step 1: Create PostgreSQL Container

Create and start a PostgreSQL container using Docker CLI:

```bash
# Create a Docker network for the project
docker network create lex-protector-network

# Create and start PostgreSQL container
docker run -d \
  --name lex-protector-postgres \
  --network lex-protector-network \
  -e POSTGRES_DB=lex_protector_db \
  -e POSTGRES_USER=lex_user \
  -e POSTGRES_PASSWORD=lex_password_2024 \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -p 5432:5432 \
  -v lex_protector_postgres_data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine
```

### Step 2: Verify Container is Running

```bash
# Check if container is running
docker ps

# Check container logs
docker logs lex-protector-postgres

# Test PostgreSQL connection
docker exec lex-protector-postgres pg_isready -U lex_user -d lex_protector_db
```

### Step 3: Configure Environment Variables

Create or update your `.env.local` file:

```env
# Database Configuration
DATABASE_URL="postgresql://lex_user:lex_password_2024@localhost:5432/lex_protector_db?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Step 4: Initialize Prisma Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio to verify connection
npx prisma studio
```

## Docker CLI Commands Reference

### Container Management

```bash
# Start the PostgreSQL container
docker start lex-protector-postgres

# Stop the PostgreSQL container
docker stop lex-protector-postgres

# Restart the PostgreSQL container
docker restart lex-protector-postgres

# Remove the PostgreSQL container
docker rm lex-protector-postgres

# View container logs
docker logs lex-protector-postgres

# Follow container logs in real-time
docker logs -f lex-protector-postgres
```

### Database Operations

```bash
# Connect to PostgreSQL database
docker exec -it lex-protector-postgres psql -U lex_user -d lex_protector_db

# Execute SQL commands directly
docker exec lex-protector-postgres psql -U lex_user -d lex_protector_db -c "SELECT version();"

# Create database backup
docker exec lex-protector-postgres pg_dump -U lex_user lex_protector_db > backup.sql

# Restore database from backup
cat backup.sql | docker exec -i lex-protector-postgres psql -U lex_user -d lex_protector_db

# Check database size
docker exec lex-protector-postgres psql -U lex_user -d lex_protector_db -c "SELECT pg_size_pretty(pg_database_size('lex_protector_db'));"
```

### Volume Management

```bash
# List Docker volumes
docker volume ls

# Inspect the PostgreSQL data volume
docker volume inspect lex_protector_postgres_data

# Create backup of volume data
docker run --rm -v lex_protector_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .

# Restore volume data from backup
docker run --rm -v lex_protector_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/postgres_backup.tar.gz -C /data
```

### Network Management

```bash
# List Docker networks
docker network ls

# Inspect the project network
docker network inspect lex-protector-network

# Remove the network (stop containers first)
docker network rm lex-protector-network
```

## Optional: pgAdmin Container

If you want a web-based database management interface:

```bash
# Create pgAdmin container
docker run -d \
  --name lex-protector-pgadmin \
  --network lex-protector-network \
  -e PGADMIN_DEFAULT_EMAIL=admin@lexprotector.com \
  -e PGADMIN_DEFAULT_PASSWORD=admin123 \
  -e PGADMIN_CONFIG_SERVER_MODE=False \
  -p 5050:80 \
  -v lex_protector_pgadmin_data:/var/lib/pgadmin \
  --restart unless-stopped \
  dpage/pgadmin4:latest
```

Access pgAdmin at <http://localhost:5050> with:

- Email: `admin@lexprotector.com`
- Password: admin123

Add PostgreSQL server in pgAdmin:

- Host: lex-protector-postgres
- Port: 5432
- Database: lex_protector_db
- Username: lex_user
- Password: lex_password_2024

## Prisma Commands

### Development Workflow

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply new migration
npx prisma migrate dev --name your-migration-name

# Reset database (development only)
npx prisma migrate reset --force

# Push schema changes without migration
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

## Complete Setup Commands

Run these commands in sequence for initial setup:

```bash
# 1. Create network
docker network create lex-protector-network

# 2. Start PostgreSQL
docker run -d \
  --name lex-protector-postgres \
  --network lex-protector-network \
  -e POSTGRES_DB=lex_protector_db \
  -e POSTGRES_USER=lex_user \
  -e POSTGRES_PASSWORD=lex_password_2024 \
  -p 5432:5432 \
  -v lex_protector_postgres_data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine

# 3. Wait for PostgreSQL to be ready
sleep 10

# 4. Verify connection
docker exec lex-protector-postgres pg_isready -U lex_user -d lex_protector_db

# 5. Generate Prisma client
npx prisma generate

# 6. Run migrations
npx prisma migrate dev
```

## Troubleshooting

### Common Issues

**Port 5432 already in use:**

```bash
# Check what's using port 5432
sudo lsof -i :5432

# Stop system PostgreSQL service
sudo systemctl stop postgresql
sudo systemctl disable postgresql
```

**Container won't start:**

```bash
# Check Docker daemon status
sudo systemctl status docker

# Check container logs for errors
docker logs lex-protector-postgres

# Remove and recreate container
docker rm -f lex-protector-postgres
# Then run the create command again
```

**Connection refused:**

```bash
# Check if container is running
docker ps | grep lex-protector-postgres

# Check PostgreSQL is ready
docker exec lex-protector-postgres pg_isready -U lex_user

# Test network connectivity
docker network inspect lex-protector-network
```

### Complete Reset

To completely reset your Docker setup:

```bash
# Stop and remove containers
docker stop lex-protector-postgres lex-protector-pgadmin
docker rm lex-protector-postgres lex-protector-pgadmin

# Remove volumes (WARNING: This deletes all data)
docker volume rm lex_protector_postgres_data lex_protector_pgadmin_data

# Remove network
docker network rm lex-protector-network

# Clean up unused Docker resources
docker system prune -f
```

## Production Considerations

### Security Best Practices

1. **Use strong passwords** - Replace default passwords
2. **Network isolation** - Use custom networks
3. **Volume encryption** - Consider encrypted volumes for sensitive data
4. **Regular backups** - Automate database backups
5. **Resource limits** - Set memory and CPU limits

### Resource Limits Example

```bash
docker run -d \
  --name lex-protector-postgres \
  --network lex-protector-network \
  --memory=1g \
  --cpus=0.5 \
  -e POSTGRES_DB=lex_protector_db \
  -e POSTGRES_USER=lex_user \
  -e POSTGRES_PASSWORD=strong_password_here \
  -p 5432:5432 \
  -v lex_protector_postgres_data:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine
```

## Integration with Your Application

Your Prisma client is configured to generate in `lib/generated/prisma`. Use it in your Next.js application:

```typescript
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

// Example API route usage
export async function GET() {
 const users = await prisma.user.findMany();
 return Response.json(users);
}
```

## Daily Development Workflow

1. **Start development:**

   ```bash
   docker start lex-protector-postgres
   npm run dev
   ```

2. **Make schema changes:**

   - Edit `prisma/schema.prisma`
   - Run `npx prisma migrate dev`

3. **View data:**

   ```bash
   npx prisma studio
   ```

4. **Stop development:**

   ```bash
   docker stop lex-protector-postgres
   ```

## Additional Resources

- [Docker CLI Documentation](https://docs.docker.com/engine/reference/commandline/cli/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)

---

This guide provides a complete Docker CLI-based setup for PostgreSQL with Prisma ORM for your Lex Protector Portal project.
