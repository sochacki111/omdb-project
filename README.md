# omdb-project
👉 https://omdb-project.netlify.app 👈  
## API Docs
👉 https://omdb-project111.herokuapp.com/api-docs 👈
## Requirements
- Docker
- OMDB API Key: http://www.omdbapi.com/apikey.aspx  
- Open ```server/.env.example``` and assign your OMDB API Key to ```OMDB_API_KEY=YOUR_OMDB_API_KEY``` then save 

## Installation
Run following commands in project root directory:
```sh
docker-compose up --build
```

## Testing
In order to run tests run following commands in project root directory:
```sh
cd server
npm run test
```

Then go to http://localhost:3000/

*To get the full experience from working with the API please follow the API documentation available at http://localhost:8080/api-docs/*

## Technologies
✅ TypeScript  
✅ Express.js  
✅ React  
✅ Jest, SuperTest (testing)  
✅ MongoDB  
✅ Docker  
✅ pino, morgan (logging)  
✅ Swagger (API Documentation)  
