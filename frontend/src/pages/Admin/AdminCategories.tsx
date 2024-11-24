import { useEffect, useState } from "react";
import axios from "axios";
import {mainUrl, userData} from "../../assets/data.ts";
import {MdDelete} from "react-icons/md";
import {toast, ToastContainer} from "react-toastify";
import {useForm} from "react-hook-form";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

interface Category {
    _id?: string;
    category_name: string;
}

export default function AdminCountries() {
    const { register, handleSubmit } = useForm<Category>();
    const [loading, setLoading] = useState<boolean>(false);
    const { token, id: userId } = userData();
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        getData().then();
    }, []);
    const getData = async () => {
        try {
            const { data } = await axios.get(mainUrl + "get-categories") ;
            setCategory(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteCategory = async (id: string) => {
        try {
            const { data } = await axios.delete(mainUrl + "delete-category/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    id: userId
                }
            })
            await getData();
            toast.success(data?.msg, {position: "top-left"});
        } catch (error) {
            console.log(error);
        }
    };
    const onSubmit = async (categoryData: Category) => {
        try {
            setLoading(true);
            const { data } = await axios.post(mainUrl + "add-category", categoryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    id: userId
                }
            });
            toast.success(data?.msg);
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.msg);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <h2 id="admin-heading">
                All Categories
            </h2>
            <form action="#" onSubmit={handleSubmit(onSubmit)} className="mb-4 gap-4 grid lg:grid-cols-2 grid-cols-1">
                <input {...register("category_name", {
                    required: {
                        value: true,
                        message: "Category Name is Required"
                    }
                })} type="text" placeholder="Write Category Name"
                       className="rounded-md border-2 outline-0 py-1.5 px-2 bg-transparent"/>
                <button className="my-button !p-1.5" type="submit">{
                    loading ?
                        <div className="flex items-center justify-center gap-2">
                            <AiOutlineLoading3Quarters
                                fontSize={20}
                                className="animate-spin"
                            />{" "}
                            Loading...
                        </div> : "Add Category"
                }</button>
            </form>
            <div className="table-container md:overflow-x-visible overflow-x-auto md:w-full w-[calc(100vw-56px-4rem)]">
                <table id="countries-table" className="md:w-full w-[200%]">
                    <thead>
                    <tr>
                        <td>No.</td>
                        <td>Category</td>
                        <td>Action</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        category.map((category, index) => <tr key={category._id}>
                            <td>{index+1}</td>
                            <td>{category.category_name}</td>
                            <td><button className="my-button !p-2" onClick={() => category._id && handleDeleteCategory(category._id)}><MdDelete /></button></td>
                        </tr>)
                    }
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={2}>Total Countries:</td>
                        <td>{category.length}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false}/>
        </>
    );
}
