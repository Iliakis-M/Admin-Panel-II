"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url = tslib_1.__importStar(require("url"));
module.exports = {
    name: "command",
    afters: ["auth"],
    befores: ["fix", "directory", "static", "end"],
    _fromFile: true,
    body: async function body(req, res, event) {
        let uri = new url.URL(`http://127.0.0.1:${event.server.opts.port}${req.url}`);
        if (uri.pathname === "/kill") {
            let time = uri.searchParams.get("time"), code = uri.searchParams.get("code");
            res.end("DONE");
            event.stop();
            await event.server.data["parent"].cmds.find(cmd => cmd.name === "kill").body(time, code);
        }
        else if (uri.pathname === "/eval") {
            let code = uri.searchParams.get("code");
            res.end(await event.server.data["parent"].cmds.find(cmd => cmd.name === "eval").body(code));
            event.stop();
        }
        return event.pass();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9taWRkbGV3YXJlcy9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQUEyQjtBQUUzQixNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2hCLElBQUksRUFBRSxTQUFTO0lBQ2YsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ2hCLE9BQU8sRUFBRSxDQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBRTtJQUNoRCxTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksRUFBRSxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQXlCLEVBQUUsR0FBd0IsRUFBRSxLQUF3QjtRQUN0RyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUU5RSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQzdCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUN0QyxJQUFJLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekY7YUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQ3BDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1RixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7Q0FDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0ICogYXMgdnNlcnYgZnJvbSBcInZhbGUtc2VydmVyLWlpXCI7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSBcInVybFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0bmFtZTogXCJjb21tYW5kXCIsXG5cdGFmdGVyczogW1wiYXV0aFwiXSxcblx0YmVmb3JlczogWyBcImZpeFwiLCBcImRpcmVjdG9yeVwiLCBcInN0YXRpY1wiLCBcImVuZFwiIF0sXG5cdF9mcm9tRmlsZTogdHJ1ZSxcblx0Ym9keTogYXN5bmMgZnVuY3Rpb24gYm9keShyZXE6IGh0dHAuSW5jb21pbmdNZXNzYWdlLCByZXM6IGh0dHAuU2VydmVyUmVzcG9uc2UsIGV2ZW50OiB2c2Vydi5DbGFzc2VzLmV2dCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHRcdGxldCB1cmkgPSBuZXcgdXJsLlVSTChgaHR0cDovLzEyNy4wLjAuMToke2V2ZW50LnNlcnZlci5vcHRzLnBvcnR9JHtyZXEudXJsfWApO1xuXHRcdFxuXHRcdGlmICh1cmkucGF0aG5hbWUgPT09IFwiL2tpbGxcIikge1xuXHRcdFx0bGV0IHRpbWUgPSB1cmkuc2VhcmNoUGFyYW1zLmdldChcInRpbWVcIiksXG5cdFx0XHRcdGNvZGUgPSB1cmkuc2VhcmNoUGFyYW1zLmdldChcImNvZGVcIik7XG5cdFx0XHRyZXMuZW5kKFwiRE9ORVwiKTtcblx0XHRcdGV2ZW50LnN0b3AoKTtcblx0XHRcdGF3YWl0IGV2ZW50LnNlcnZlci5kYXRhW1wicGFyZW50XCJdLmNtZHMuZmluZChjbWQgPT4gY21kLm5hbWUgPT09IFwia2lsbFwiKS5ib2R5KHRpbWUsIGNvZGUpO1xuXHRcdH0gZWxzZSBpZiAodXJpLnBhdGhuYW1lID09PSBcIi9ldmFsXCIpIHtcblx0XHRcdGxldCBjb2RlID0gdXJpLnNlYXJjaFBhcmFtcy5nZXQoXCJjb2RlXCIpO1xuXHRcdFx0cmVzLmVuZChhd2FpdCBldmVudC5zZXJ2ZXIuZGF0YVtcInBhcmVudFwiXS5jbWRzLmZpbmQoY21kID0+IGNtZC5uYW1lID09PSBcImV2YWxcIikuYm9keShjb2RlKSk7XG5cdFx0XHRldmVudC5zdG9wKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnBhc3MoKTtcblx0fVxufTtcbiJdfQ==