import { useEffect, useState } from "react";

const App = () => {

    //1 create useState
    const [employeer, setEmployeer] = useState([])

    //2 call api
    useEffect(() => {
        fetch("api/Employeer/getall")
            .then(response => { return response.json() })
            .then(responseJson => {

                setEmployeer(responseJson)
            })
    }, [])

    //3.- create div and table
    return (
        <div className="container">
            <h1>Employees</h1>
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>addresedees</th>
                                <th>country</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employeer.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.country}</td>
                                        
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App;