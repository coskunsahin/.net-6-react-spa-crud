import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
const App = () => {

    const [product, setProduct] = useState([])
    const [name, setName] = useState("");
    const viewProduct = async () => {

        const response = await fetch("api/Product/liste");

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setProduct(data)
        } else {
            console.log("status code:" + response.status)
        }
    }

    
    useEffect(() => {
        viewProduct();
    }, [])

  
    const saveProduct = async (e) => {
        
        e.preventDefault()

        const response = await fetch("api/Product/save", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name })
        })

        if (response.ok) {
            setName("");
            await viewProduct();
        }
    }


    const closeProduct = async (id) => {

        const response = await fetch("api/Product/close/" + id, {
            method: "DELETE"
        })

        if (response.ok)
            await viewProduct();
    }


    //3.- create div and table
    return (

        <div className="container bg-dark p-4 vh-100">

            <h2 className="text-white">List Product</h2>
            <div className="row">

                <div className="col-sm-12">
                   
                    <form onSubmit={saveProduct}> 

                        <div className="input-group">
                            <input type="text" className="form-control"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />

                            <button className="btn btn-success">Add</button>
                        </div>

                    </form>
                </div>

            </div>


       
            <div className="row mt-4">
                <div className="col-sm-12">

               
                    <div className="list-group">   
                        {
                            product.map(
                                (item) => (
                                    <div key={item.id} className="list-group-item list-group-item-action">

                                        <h5 className="text-primary">{item.name}</h5>

                                        <div className="d-flex justify-content-between">    
                                            <small className="text-muted">{(item.quantity)}</small>
                                            <button type="button" className="btn btn-sm btn-outline-danger"
                                           
                                                onClick={() => closeProduct(item.id)}>
                                                Close
                                            </button>
                                        </div>

                                    </div>
                                )
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App;