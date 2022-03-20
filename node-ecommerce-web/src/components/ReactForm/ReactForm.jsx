import { useForm } from 'react-hook-form'

const ReactForm = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log('data :>> ', data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                placeholder="Name"
                {...register('Name', { required: true, maxLength: 80 })}
            />
            <input
                type="text"
                placeholder="Icon Name"
                {...register('Icon Name', { required: true, maxLength: 100 })}
            />
            <input
                type="text"
                placeholder="Color Code"
                {...register('Color Code', { required: true })}
            />

            <input type="submit" />
        </form>
    )
}

export default ReactForm
