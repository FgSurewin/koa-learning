// Format of token
// Authorization : Bearer <access_token>

module.exports = async (ctx, next) => {
	// Get auth header value
	const bearerHeader = ctx.header['authorization'];
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		console.log(bearer);
		ctx.token = bearer[1];
		next();
	} else {
		ctx.status = 403;
	}
};
