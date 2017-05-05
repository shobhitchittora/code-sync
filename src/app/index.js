import React from 'react';
import socketio from 'socket.io-client';
import Prism from 'prismjs';

const styles = {
    container: {
        background: '',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    pre: {
        fontSize: '70%'
    }
};

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { code: '' }
    }

    componentWillMount() {
        console.log('CWM');
    }

    componentDidMount() {
        let socket = socketio.connect();
        socket.on('connect', () => {
            console.log('Connecting to server');
        });

        socket.on('code', code => {
            console.log(`received --> ${code}`);
            let html = Prism.highlight(code, Prism.languages.javascript);
            console.log(html);
            this.setState({ code: html });
        });
    }

    render() {
        let code = this.props.code;
        return (
            <div style={styles.container}>
                <pre className="line-numbers" style={styles.pre}>
                    <code className="language-javascript" dangerouslySetInnerHTML={{ __html: this.state.code }}>
                    </code>
                </pre>
            </div>
        )
    };
};