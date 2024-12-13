import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

function Chatinput() {
    const { sendMessage } = useChatStore()
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file")
            return;
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) {
            return;
        }
        try {
            await sendMessage({ text: text.trim(), image: imagePreview })
            setText("")
            setImagePreview(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        } catch (error) {
            console.log("failed to send message :", error.message);
        }
    }
        return (
            <div className='p-4 w-full'>
                {
                    imagePreview && (
                        <div className='mb-3 flex items-center gap-2'>
                            <div className='relative'>
                                <img
                                    className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                                    src={imagePreview}
                                    alt="Preview" />
                                <button className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type='button'
                                    onClick={removeImage}
                                >
                                    <X className='size-3' />
                                </button>
                            </div>
                        </div>
                    )
                }
                <form onSubmit={handleSendMessage} className='flex items-center gap-2 '>
                    <div className='flex flex-1 gap-2'>
                        <input type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className='input input-bordered w-full rounded-lg input-sm sm:input-md'
                            placeholder='Type a message...'
                        />
                        <input type="file"
                            className='hidden'
                            accept='image/*'

                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                        <button
                            type='button'
                            className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                            onClick={() => fileInputRef.current?.click()}>
                      
                            <Image size={20} />
                        </button>
                    </div>
                    <button
                        className='btn btn-sm btn-circle'
                        disabled={!text.trim() && !imagePreview}
                        type='submit'>
                  
                        <Send size={22} />
                    </button>
                </form>
            </div>
        )
    }


export default Chatinput