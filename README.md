# Backend

## Scripts

development

```
npm run dev
```

เพิ่มข้อมูลใน database

```
npm run db:create
```

ลบข้อมูลใน database

```
npm run db:delete
```

## Setting up project

### Environment Variables

สร้างไฟล์ .env มาจาก .env.template

```
MONGODB_URI=
DATABASE_NAME=
PORT=
```

### Development

```
npm install
npm run db:create
npm run dev
```

## Docker

```
docker-compose up
```
