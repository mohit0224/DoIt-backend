import Joi from "joi";

const signupValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).trim().required().messages({
			"string.base": "Username should be a text value.",
			"string.empty": "Username is required.",
			"string.min": "Username must be at least 3 characters long.",
			"string.max": "Username cannot be longer than 50 characters.",
			"any.required": "Username is a required field.",
		}),

		email: Joi.string().email().lowercase().trim().required().messages({
			"string.base": "Email should be a text value.",
			"string.email": "Please enter a valid email address.",
			"string.empty": "Email is required.",
			"any.required": "Email is a required field.",
		}),

		password: Joi.string()
			.min(8)
			.message("Password must be at least 8 characters long")
			.regex(/[A-Z]/)
			.message("Password must include at least one uppercase letter")
			.regex(/[a-z]/)
			.message("Password must include at least one lowercase letter")
			.regex(/\d/)
			.message("Password must include at least one number")
			.regex(/[!@#$%^&*(),.?":{}|<>]/)
			.message("Password must include at least one special character"),
	});

	return schema.validate(data);
};

const loginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().lowercase().trim().required().messages({
			"string.base": "Email should be a text value.",
			"string.email": "Please enter a valid email address.",
			"string.empty": "Email is required.",
			"any.required": "Email is a required field.",
		}),

		password: Joi.string()
			.min(8)
			.message("Password must be at least 8 characters long")
			.regex(/[A-Z]/)
			.message("Password must include at least one uppercase letter")
			.regex(/[a-z]/)
			.message("Password must include at least one lowercase letter")
			.regex(/\d/)
			.message("Password must include at least one number")
			.regex(/[!@#$%^&*(),.?":{}|<>]/)
			.message("Password must include at least one special character"),
	});

	return schema.validate(data);
};

export { signupValidation, loginValidation };
