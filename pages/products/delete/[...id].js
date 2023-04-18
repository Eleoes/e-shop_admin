import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteProductPage() {
    const router = useRouter();
    const {id} = router.query;
    const [productInfo, setProductInfo] = useState();

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);

    function goBack() {
        router.push('/products');
    }

    async function handleDelete() {
        await axios.delete('/api/products?id='+id);
        goBack();
    }
    
    return (
        <Layout>
            <h1 className="text-center">Do you really want to delete &quot;{productInfo?.title}&quot; ?</h1>
            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={handleDelete}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </Layout>
    );
}