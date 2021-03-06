"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Classes = module.parent.exports.Classes, chalk = module.parent.exports.chalk;
exports.command = new Classes.Command({
    name: "catch",
    desc: "Catch undefined commands",
    exp: new RegExp('^' + Classes.Command.prefix, "sim"),
    usage: eval("'" + Classes.Command.prefix + "'"),
    _compl: eval("'" + Classes.Command.prefix + "'"),
    _priority: Infinity,
    body: function body(command) {
        if (command)
            console.error(chalk.redBright(chalk `"{red ${command}}" command does not exist!`));
        return Classes.Null;
    },
    parse: function parse(line, panel) {
        return this.body(line);
    } //parse
});
exports.default = exports.command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY29tbWFuZHMvY2F0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUViLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDNUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUkxQixRQUFBLE9BQU8sR0FBZSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDcEQsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsMEJBQTBCO0lBQ2hDLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUMvQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDaEQsU0FBUyxFQUFFLFFBQVE7SUFDbkIsSUFBSSxFQUFFLFNBQVMsSUFBSSxDQUFDLE9BQWdCO1FBQ25DLElBQUksT0FBTztZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUEsU0FBUyxPQUFPLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUMvRixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBZ0I7UUFDbkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxPQUFPO0NBQ1QsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsZUFBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IENsYXNzZXMgPSBtb2R1bGUucGFyZW50LmV4cG9ydHMuQ2xhc3Nlcyxcblx0Y2hhbGsgPSBtb2R1bGUucGFyZW50LmV4cG9ydHMuY2hhbGs7XG5cbmltcG9ydCB7IENsYXNzZXMgYXMgQ1QgfSBmcm9tIFwiLi4vQ2xhc3Nlc1wiO1xuXG5leHBvcnQgdmFyIGNvbW1hbmQ6IENULkNvbW1hbmQgPSBuZXcgQ2xhc3Nlcy5Db21tYW5kKHtcblx0bmFtZTogXCJjYXRjaFwiLFxuXHRkZXNjOiBcIkNhdGNoIHVuZGVmaW5lZCBjb21tYW5kc1wiLFxuXHRleHA6IG5ldyBSZWdFeHAoJ14nICsgQ2xhc3Nlcy5Db21tYW5kLnByZWZpeCwgXCJzaW1cIiksXG5cdHVzYWdlOiBldmFsKFwiJ1wiICsgQ2xhc3Nlcy5Db21tYW5kLnByZWZpeCArIFwiJ1wiKSxcblx0X2NvbXBsOiBldmFsKFwiJ1wiICsgQ2xhc3Nlcy5Db21tYW5kLnByZWZpeCArIFwiJ1wiKSxcblx0X3ByaW9yaXR5OiBJbmZpbml0eSxcblx0Ym9keTogZnVuY3Rpb24gYm9keShjb21tYW5kPzogc3RyaW5nKTogc3ltYm9sIHtcblx0XHRpZiAoY29tbWFuZCkgY29uc29sZS5lcnJvcihjaGFsay5yZWRCcmlnaHQoY2hhbGtgXCJ7cmVkICR7Y29tbWFuZH19XCIgY29tbWFuZCBkb2VzIG5vdCBleGlzdCFgKSk7XG5cdFx0cmV0dXJuIENsYXNzZXMuTnVsbDtcblx0fSwgLy9ib2R5XG5cdHBhcnNlOiBmdW5jdGlvbiBwYXJzZShsaW5lOiBzdHJpbmcsIHBhbmVsPzogQ1QuUGFuZWwpOiBzeW1ib2wge1xuXHRcdHJldHVybiB0aGlzLmJvZHkobGluZSk7XG5cdH0gLy9wYXJzZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmQ7XG4iXX0=