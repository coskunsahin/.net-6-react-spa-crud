import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap"
 


const modelProducts = {
    id: 0,
    price: "",
    supplierId: "",
    name: "",
    instock: ""
}
 
const ModelProducts = ({
    viewModal, setViewModal, saveProduct
    , edit, setEdit, editProduct
}) => {

    const [product, setProduct
    ] = useState(
        modelProducts);

    const actualizarDato = (e) => {

        console.log(e.target.name + " : " + e.target.value)
        setProduct(
            {
                ...product,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (product.id === 0) {

            saveProduct(product)
        } else {
            editProduct(product)
        }

        setProduct(modelProducts)

    }

    useEffect(() => {
        if (edit != null) {
            setProduct(edit)
        } else {
            setProduct(modelProducts)
        }
    }, [edit])

    const cerrarModal = () => {

        setViewModal(!viewModal)
        setEdit(null)
    }
  



    return (

        <Modal isOpen={viewModal}>
            <ModalHeader>

                {product.id === 0 ? "Nuevo product" : "Editar product"}

            </ModalHeader>
            <ModalBody>
                <Form>

                     
                    <FormGroup>
                        <Label>name</Label>
                        <Input name="name" onChange={(e) => actualizarDato(e)} value={product.name} />
                    </FormGroup>
                    <FormGroup>
                        <Label>quantity</Label>
                        <Input name="quantity" onChange={(e) => actualizarDato(e)} value={product.quantity} />
                    </FormGroup>
                    <FormGroup>
                        <Label>price</Label>
                        <Input name="price" onChange={(e) => actualizarDato(e)} value={product.price} />
                    </FormGroup>
                    <FormGroup>
                        <Label>supplierId</Label>
                        <Input name="supplierId" onChange={(e) => actualizarDato(e)} value={product.supplierId} />
                    </FormGroup>

                    <FormGroup>
                        <Label>instock</Label>
                        <Input name="instock" onChange={(e) => actualizarDato(e)} value={product.instock} />
                    </FormGroup>
                </Form>
                
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>SAVE</Button>
                <Button color="danger" size="sm" onClick={cerrarModal} >Cancel</Button>
             
            </ModalFooter>
        </Modal>

    )
}

export default ModelProducts;