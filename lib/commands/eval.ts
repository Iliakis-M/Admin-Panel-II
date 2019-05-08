"use strict";

const Classes = module.parent.exports.Classes;

export var command = new Classes.Command({
	name: "eval",
	desc: "Evaluate JS expressions",
	exp: new RegExp('', "sim"),
	usage: "code<String>",
	_compl: '',
	_priority: Infinity,
	body: function body(code: string) {
		return eval(code);
	}, //body
	parse: function parse(line: string, panel) {
		return this.body(line);
	} //parse
});

export default command;