

/* Validation constraints */
const CONTENT_MIN_LENGTH: number = 8;
const CONTENT_MAX_LENGTH: number = 4096;


/* Validation error messages */
const MSG_CONTENT_CONSTRAINTS = `Content must be between ${CONTENT_MIN_LENGTH} and ${CONTENT_MAX_LENGTH} characters length`;


const POST_CREATE_SCHEMA = Object({
	content: {
		in: ["body"],
		isLength: {
			options: { min: CONTENT_MIN_LENGTH, max: CONTENT_MAX_LENGTH },
			errorMessage: MSG_CONTENT_CONSTRAINTS
        }
	}
});

export default POST_CREATE_SCHEMA;
