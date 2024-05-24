import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form } from "react-router-dom";
import UrlModal from "../components/UrlModal";
import { instance } from "../api/axios.api";

export const urlsAction = async ({ request }: any) => {
    switch(request.method){
        case "POST": {
            const formData = await request.formData()
            const title = {
                title: formData.get('title'),
            }
            await instance.post('/shorten', title)
            return null
        }
        case "PATCH": {
            return null
        }
        case "DELETE": {
            return null
        }
    }
}

const Urls: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    return (
    <>
    <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1> Your link list: </h1>

        {/* Url List */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
                <div className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2">
                    Link
                    <div className="absolute hidden bottom-0 left-0 right-0 top-0 flex items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">

                        <button>
                            <AiFillEdit />
                        </button>

                        <Form className='flex' method='delete' action="/urls">
                            <input type="hidden" value={'Url ID'} />
                            <button type="submit">
                                <AiFillCloseCircle />
                            </button>
                        </Form>
                    </div>
                </div>
            </div>

              {/* Add Url */}
                <button 
                onClick={() => setVisibleModal(true)} 
                className="mt-5 max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
                    
                    <FaPlus />
                    <span>Create a new link</span>
                </button>
        </div>
        {/* Add Url Modal */}
        {visibleModal && (<UrlModal type='post' setvisibleModal={setVisibleModal}/>
        )}
        
         {/* Edit Url Modal */}
        
    </>
    )
};

export default Urls;