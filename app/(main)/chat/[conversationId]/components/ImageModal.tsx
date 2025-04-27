import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineUpload } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

type FileProp = File & { preview: string }

const ImageModal = () => {
    const [files, setFiles] = useState<FileProp[]>([])
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, accept: {
            "image/*": []
        }
    })

    const removeFile = (name: string) => {
        setFiles(prevFile => prevFile.filter(file => file.name !== name))
    }

    return (
        <div>
            <div {...getRootProps({
                className: "border-2 px-3 py-5 flex flex-col items-center justify-center gap-2 text-gray-500 cursor-pointer border-dashed h-64"
            })}>
                <AiOutlineUpload size={20} />
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the images   here ...</p> :
                        <p>Drag 'n' drop some images here, or click to select images</p>
                }
            </div>
            <div className="my-3 text-gray-500 font-semibold">
                <span>Selected Image(s):</span>
                <div className="whitespace-nowrap">
                    <ul className="flex gap-3 overflow-x-auto pt-3">
                        {files.map(file => (
                            <li key={file.name} className="shrink-0 relative border-2">
                                <Image src={file.preview} alt={file.name} width={100} height={100} onLoad={() => URL.revokeObjectURL(file.preview)} className="object-contain aspect-square" />
                                <button type="button" className="absolute -right-2 -top-2 bg-red-500 rounded-full p-1 border-1 border-red-500 text-white cursor-pointer hover:bg-white hover:text-red-500 " onClick={() => removeFile(file.name)}><IoClose /></button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="pt-3">
                <Button className="w-full cursor-pointer" variant={"custom"}>Send</Button>
            </div>
        </div>
    )
}

export default ImageModal