import { NextRequest, NextResponse } from "next/server"
import { promisify } from 'util'
import { IncomingForm } from 'formidable'
import { cloudinary } from '@/lib/cloudinary'
import { UploadApiResponse } from "cloudinary";


export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData()
        const files = formData.getAll('files') as File[]
        const uploadedImagesURL: string[] = []

        console.log(files);

        const uploadPromises = files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise<UploadApiResponse>((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: 'Chatzz/images' }, (error, result) => {
                    if (error || !result) return reject(error);
                    resolve(result);
                }).end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);
        results.map(result => uploadedImagesURL.push(result.secure_url))

        return NextResponse.json({ success: "Uploaded successfully", imageUrl: uploadedImagesURL }, { status: 200 })


    } catch (error) {
        console.log("Upload Image route error", error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }

}