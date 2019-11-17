"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Classes = module.parent.exports.Classes;
exports.command = new Classes.Command({
    name: "kill",
    desc: "Kill JS process (after interval)",
    exp: new RegExp('^' + Classes.Command.prefix + "k(ill)? ?(\\d+( \\d+)?)?$", "sim"),
    usage: eval("'" + Classes.Command.prefix + "'") + "kill interval?<Number> code?<Number>",
    _compl: eval("'" + Classes.Command.prefix + "'") + "kill ",
    _priority: 0,
    body: function body(time, code) {
        if (time) {
            return setTimeout(() => process.exit(code), Number(time));
        }
        else {
            process.exit();
        }
    },
    parse: function parse(line, panel) {
        let nline = line.split(' ');
        return this.body(nline[1], nline[2] ? nline[2] : undefined);
    },
});
exports.default = exports.command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21tYW5kcy9raWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFFYixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFJbkMsUUFBQSxPQUFPLEdBQWUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3BELElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLGtDQUFrQztJQUN4QyxHQUFHLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLDJCQUEyQixFQUFFLEtBQUssQ0FBQztJQUNsRixLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxzQ0FBc0M7SUFDeEYsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTztJQUMxRCxTQUFTLEVBQUUsQ0FBQztJQUNaLElBQUksRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFZLEVBQUUsSUFBYTtRQUM5QyxJQUFJLElBQUksRUFBRTtZQUNULE9BQU8sVUFBVSxDQUFDLEdBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakU7YUFBTTtZQUNOLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0YsQ0FBQztJQUNELEtBQUssRUFBRSxTQUFTLEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBZ0I7UUFDbkQsSUFBSSxLQUFLLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0QsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsZUFBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IENsYXNzZXMgPSBtb2R1bGUucGFyZW50LmV4cG9ydHMuQ2xhc3NlcztcblxuaW1wb3J0IHsgQ2xhc3NlcyBhcyBDVCB9IGZyb20gXCIuLi9DbGFzc2VzXCI7XG5cbmV4cG9ydCB2YXIgY29tbWFuZDogQ1QuQ29tbWFuZCA9IG5ldyBDbGFzc2VzLkNvbW1hbmQoe1xuXHRuYW1lOiBcImtpbGxcIixcblx0ZGVzYzogXCJLaWxsIEpTIHByb2Nlc3MgKGFmdGVyIGludGVydmFsKVwiLFxuXHRleHA6IG5ldyBSZWdFeHAoJ14nICsgQ2xhc3Nlcy5Db21tYW5kLnByZWZpeCArIFwiayhpbGwpPyA/KFxcXFxkKyggXFxcXGQrKT8pPyRcIiwgXCJzaW1cIiksXG5cdHVzYWdlOiBldmFsKFwiJ1wiICsgQ2xhc3Nlcy5Db21tYW5kLnByZWZpeCArIFwiJ1wiKSArIFwia2lsbCBpbnRlcnZhbD88TnVtYmVyPiBjb2RlPzxOdW1iZXI+XCIsXG5cdF9jb21wbDogZXZhbChcIidcIiArIENsYXNzZXMuQ29tbWFuZC5wcmVmaXggKyBcIidcIikgKyBcImtpbGwgXCIsXG5cdF9wcmlvcml0eTogMCxcblx0Ym9keTogZnVuY3Rpb24gYm9keSh0aW1lOiBzdHJpbmcsIGNvZGU/OiBudW1iZXIpOiBOb2RlSlMuVGltZW91dCB7XG5cdFx0aWYgKHRpbWUpIHtcblx0XHRcdHJldHVybiBzZXRUaW1lb3V0KCgpOiBuZXZlciA9PiBwcm9jZXNzLmV4aXQoY29kZSksIE51bWJlcih0aW1lKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb2Nlc3MuZXhpdCgpO1xuXHRcdH1cblx0fSwgLy9ib2R5XG5cdHBhcnNlOiBmdW5jdGlvbiBwYXJzZShsaW5lOiBzdHJpbmcsIHBhbmVsPzogQ1QuUGFuZWwpOiBOb2RlSlMuVGltZW91dCB7XG5cdFx0bGV0IG5saW5lOiBzdHJpbmdbXSA9IGxpbmUuc3BsaXQoJyAnKTtcblxuXHRcdHJldHVybiB0aGlzLmJvZHkobmxpbmVbMV0sIG5saW5lWzJdID8gbmxpbmVbMl0gOiB1bmRlZmluZWQpO1xuXHR9LCAvL3BhcnNlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZDtcbiJdfQ==