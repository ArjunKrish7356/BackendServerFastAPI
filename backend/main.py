from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import Union
from fastapi.responses import JSONResponse
import os
from fastapi.middleware.cors import CORSMiddleware

UPLOAD_DIR = r"C:\Users\91735\Desktop\projects\fastapi-img\backend\images"


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    file: UploadFile = File(...)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/items/")
async def create_item(file: UploadFile = File(...)):
    content = await file.read()
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as output_file:
        output_file.write(content)
    return JSONResponse(status_code=200, content={"message": "File uploaded successfully", "filename": file.filename})