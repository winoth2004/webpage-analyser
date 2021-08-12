import React from 'react';

interface FormProps {
}

export class Form extends React.Component<FormProps, any>
{
    constructor(props: FormProps) {
        super(props);
        this.state = {
            domainURL: '',
            isLoading: false,
            result: ''
        };
    }

    handleURLChange(event: any) {
        this.setState({domainURL: event.target.value});
    }

    public render(): JSX.Element
    {
        return (
            <div className="form-container">
                <div className="form-field">
                    <span>Enter url with domain </span>
                    <input id="url" type="text" value={this.state.domainURL} onChange={this.handleURLChange.bind(this)}/>
                    <input type="submit" value="Submit" onClick={this.runfinder.bind(this)} /> <br />
                </div>
                {this.state.isLoading && <div className="form-field" id="loading">LOADING...</div>}
                {this.state.result && <div className="form-field" id="finderresult">{this.state.result}</div>}
            </div>
            );
    }

    toggleLoader() {
        this.setState({
            isLoading: !this.state.isLoading
        });
    }

    public runfinder()
    {
        this.toggleLoader();
        window.fetch('/website-report', {
            // learn more about this API here: https://graphql-pokemon2.vercel.app/
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                domainURL: this.state.domainURL
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.toggleLoader();
            let isStaticWebsite = false;
            const resourceList = data.response || [];
            const documentInfo = resourceList.find((resourceInfo: any) => resourceInfo.url === this.state.domainURL) || {};
            const documentResHeader = documentInfo.responseHeaders || {};
            if (!documentInfo.hasRedirectionChain) {
                const cacheControl = documentResHeader['cache-control'];
                if (cacheControl) {
                    const maxAgeMatch = cacheControl.match(/max-age=(\d*)/i);
                    try{
                        if (maxAgeMatch.length > 1 && parseInt(maxAgeMatch[1])) {
                            isStaticWebsite = true;
                        }
                    }
                    catch(e) {}
                }
            }
            this.setState({
                result: `${this.state.domainURL} is ${!isStaticWebsite ? 'not' : ''} a static website`
            });
        });
    }
}