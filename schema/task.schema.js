import Joi from "joi";

const taskValidation = (data) => {
	const schema = Joi.object({
		task: Joi.string().min(2).max(50).trim().required().messages({
			"string.base": "Task should be a text value.",
			"string.empty": "Task is required.",
			"string.min": "Task must be at least 2 characters long.",
			"string.max": "Task cannot be longer than 50 characters.",
			"any.required": "Task is a required field.",
		}),
	});

	return schema.validate(data);
};

export { taskValidation };
