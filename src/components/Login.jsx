import React from 'react';

export default class Login extends React.Component {
	state = {
		username : "",
		password : "",
		error : "",
		errorClass : ""
	};

	formChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
    		[name]: value
    	});
	};

	login = async event => {
		event.preventDefault();
		const response = await fetch('/login', {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		});

		const json = await response.json();
		let classFlag = "success";
		if (json.flag) {
			classFlag = "error";
		}
		this.setState({
			errorClass : classFlag,
			error : json.msg
		});
	};

	render = _ => {
		return(
			<div>
				<h2>SourceUndead</h2>
				<div className={this.state.errorClass}>{this.state.error}</div>
				<div className="container">
					<form>
						<div className="row">
							<div className="twelve columns">
								<label htmlFor="name">Username</label>
								<input onChange={this.formChange} value={this.state.username} className="u-full-width" name="username" type="text" placeholder="Username" />
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<label htmlFor="password">Password</label>
								<input onChange={this.formChange} value={this.state.password} className="u-full-width" name="password" type="password" placeholder="Password" />
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<button onClick={this.login} type="submit" className="u-full-width button">Submit</button>
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<div className="u-full-width">
									<small>Don't have an account? <a href="/create">Create An Account</a>!</small>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	};
}