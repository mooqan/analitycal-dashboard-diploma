import { FC } from "react"
import { Form } from "react-router-dom"

interface IUrlModal {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
}

const UrlModal: FC<IUrlModal> = ({type, id, setVisibleModal}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/50 ">
        <Form 
            action="/urls"
            method={type}
            onSubmit={() => setVisibleModal(false)}
            className='grid w-[300px] gap-2 rounded-md bg-slate-900 p-5'>
            <label htmlFor="title">
                <small>New link title</small>
                <input 
                className='input w-full' 
                type="text" 
                name="title" 
                placeholder="Title..." />
            </label>

            <div className="flex items-center gap-2">
                <button  className='btn btn-green' type='submit'>{type === 'patch' ? 'Save' : 'Create'}</button>
                <button onClick={() => setVisibleModal(false)} className='btn btn-red'>Close</button>
            </div>
        </Form>
    </div>
  )
}

export default UrlModal