import { Button, Table } from "reactstrap"
import QRCode from "react-qr-code"


const TableProduct = ({ data, setEdit, viewModal, setViewModal, eliminarContacto }) => {

    const enviarDatos = (product) => {
        setEdit(product)
        setViewModal(!viewModal)

    }
  
    return (
  <Table hover>
            <thead>
                <tr>
                    <th>ProductName</th>
                    <th>price</th>
                    <th>QRCode</th>
                    <th>instock</th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                {(data.length < 1) ? (
                    <tr>
                        <td colSpan="4">Sin registros</td>
                    </tr>
                ) : (
                    data.map((item) => (

                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>

                            <td>  <QRCode
                                size={100}
                                bgColor="white"
                                fgColor="black"
                                value={item.name} /></td>
                            <td>{item.instock}   </td>

                            <td>
                                <Button color="primary" size="sm" className="me-2"
                                    onClick={() => enviarDatos(item)}
                                >Edit</Button>
                                <Button color="danger" size="sm"
                                    onClick={() => eliminarContacto(item.id)}
                                >Delete</Button>
                            </td>
                        </tr>

                    ))

                )}
            </tbody>
        </Table>

        )

}

export default TableProduct;