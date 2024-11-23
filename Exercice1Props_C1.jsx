import React from "react";
import Exercice2Props_C1 from './Exercice2Props_C1';

export default class Exercice1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listClient: [
                'client1',
                'client2',
                'client3'
            ],
            listClientValides: []
        };
    }

    updateChild = (client) => {
        this.setState(prevState => ({
            listClient: prevState.listClient.filter((tt) => tt !== client),
            listClientValides: [...prevState.listClientValides, client]
        }));
    }

    render() {
        return (
            <div>
                <div>
                    <ul>
                        {this.state.listClient.map((cli) => (
                            <li key={cli} onClick={() => this.updateChild(cli)}> {cli}
                            </li>
                        ))}
                    </ul>
                </div>

                <br />
                <div style={{ backgroundColor: "green" }}>
                    <Exercice2Props_C1 listClients={this.state.listClientValides} />
                    <br />
                </div>
            </div>
        );
    }
}
