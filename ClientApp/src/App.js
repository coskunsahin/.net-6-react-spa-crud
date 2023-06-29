/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"

import TableProduct from "./components/TableProduct"
import ModelProducts from "./components/ModelProducts"
const App = () => {
    const [products, setProducts] = useState([])
    const [viewModal, setViewModal] = useState(false);
    const [edit, setEdit] = useState(null)


    const viewproduct = async () => {

        const response = await fetch("api/Product/liste");

        if (response.ok) {
            const data = await response.json();
            setProducts(data)
        } else {
            console.log("error en la lista")
        }

    }


    useEffect(() => {

        viewproduct()
    }, [])



    const saveProduct = async (product) => {

        const response = await fetch("api/Product/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(product)
        })
        if (response.ok) {
            setViewModal(!viewModal);
            viewproduct();
        }
    }

    const editProduct = async (product) => {

        const response = await fetch("api/Product/Edit", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(product)
        })
        if (response.ok) {
            setViewModal(!viewModal);
            viewproduct();
        }
    }

    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }


        const response = await fetch("api/Product/close/" + id, {
            method: 'DELETE',
        })

        if (response.ok) {
            viewproduct();
        }
    }



    return (
        <Container>
            <Row className="mt-5">

                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de product</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                onClick={() => setViewModal(!viewModal)}
                            >Nuevo product</Button>
                            <hr></hr>
                            <TableProduct data={products}
                                setEdit={setEdit}
                                viewModal={viewModal}
                                setViewModal={setViewModal}

                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>
                </Col>

            </Row>

            <ModelProducts
                viewModal={viewModal}

                setViewModal={setViewModal}
                saveProduct={saveProduct}


                edit
                ={edit}
                setEdit={setEdit}
                editProduct={editProduct}
            />
        </Container>
    )

}

export default App;