import React from 'react';
import ReactDOM from 'react-dom';
import compiler from 'mson/lib/compiler';
import Component from 'mson-react/lib/component';

const definition = {
    component: 'Form',
    fields: [
        {
            name: 'heading',
            component: 'Text',
            text: '# Form using [MSON](https://github.com/redgeoff/mson)'
        },
        {
            name: 'firstName',
            component: 'TextField',
            label: 'First Name',
            required: true,
            block: false
        },
        {
            name: 'lastName',
            component: 'TextField',
            label: 'Last Name',
            required: true
        },
        {
            name: 'email',
            component: 'EmailField',
            label: 'Email',
            help: 'Any email address except nope@example.com'
        },
        {
            name: 'submit',
            component: 'ButtonField',
            label: 'Submit',
            type: 'submit',
            icon: 'Save'
        },
        {
            name: 'reset',
            component: 'ButtonField',
            label: 'Reset',
            icon: 'Clear'
        }
    ],
    validators: [
        {
            where: {
                'fields.email.value': 'nope@example.com'
            },
            error: {
                field: 'email',
                error: 'must not be {{fields.email.value}}'
            }
        }
    ]
};

class App extends React.PureComponent {
    state = {
        form: null
    };

    loadValues(form) {
        // Load any initial data, e.g from an API
        form.setValues({
            id: "abc123",
            firstName: "Ashwani",
            lastName: "Luhaniwal",
            email: "ashwani.luhaniwal@gmail.com"
        });
    }

    handleSubmit = () => {
        const { form } = this.state;

        // TODO: Contact some API with the data
        console.log("submitting", form.getValues());

        // Simulate response from API saying that email address is already in use and report error to user
        if (form.get("fields.email.value") === "ashwani.luhaniwal@gmail.com") {
            form.set({ "fields.email.err": "already in use" });
        } else {
            // Everything was succ
        }
    };

    handleReset = () => {
        this.state.form.reset();
    };

    componentDidMount() {
        const form = compiler.newComponent(definition);
        this.setState({ form });

        this.loadValues(form);
        form.on("submit", this.handleSubmit);
        form.on("reset", this.handleReset);
    }

    componentWillUnmount() {
        // Remove all listeners to prevent listener leaks
        this.state.form.destroy();
    }

    render() {
        const { form } = this.state;
        return form ? <Component component={form} /> : null;
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();