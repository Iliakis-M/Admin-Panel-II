"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const path = tslib_1.__importStar(require("path"));
const os = tslib_1.__importStar(require("os"));
var Socket;
(function (Socket) {
    /**
     * Wrapper for setting up the Socket.
     *
     * @author V. H.
     * @date 2019-05-12
     * @export
     * @param {SocketIO.Server} io
     * @param {Classes.Panel} panel
     * @returns {SocketIO.Namespace}
     */
    function setup(io, panel) {
        let admin = io.of("/admin"), login = false, ladm;
        panel.on("_debug", async (...data) => {
            if (ladm)
                ladm.emit("_debug", ...data);
        });
        panel.serv.on("_debug", async (...data) => {
            if (ladm)
                ladm.emit("_s_debug", ...data);
        });
        panel.stater.on("snap", async (reg) => {
            if (ladm)
                ladm.emit("snap", reg);
        });
        if (panel.refresh) {
            let ends = new Set([
                ".htm",
                ".html",
                ".htmx",
                ".htmlx",
                ".js",
                ".xjs",
                ".css",
                ".cssx"
            ]);
            fs.watch(path.join(panel.serv.opts.serveDir, panel.serv.opts.public), {
                recursive: true
            }, (evt, file) => {
                if (panel.refresh && Array.from(ends.values()).some(end => file.endsWith(end))) {
                    panel._debug("Refreshing...");
                    admin.emit("refresh");
                }
            });
        }
        admin.on("connect", async (socket) => {
            panel._debug(socket.id + " connected.");
            socket.once("disconnecting", async (reason) => {
                panel._debug(socket.id + " disconnecting  " + reason);
                login = false;
            });
            if (!login) { //user already inside and pass changed?? vulnerable
                socket.join("admin", async (err) => {
                    if (!err) {
                        socket.emit("_debug", panel._debuglog);
                        socket.emit("_s_debug", panel.serv._debuglog);
                        socket.emit("cli", panel._rllog);
                        for (let snap of panel.stater.samples) {
                            socket.emit("snap", snap);
                        }
                        socket.emit("joined", "admin");
                        panel._debug(`${socket.id} is admin.`);
                        login = true;
                        ladm = socket;
                        socket.emit("stat", "arch", os.arch());
                        socket.emit("stat", "cpus", os.cpus().length);
                        socket.emit("stat", "endian", os.endianness());
                        socket.emit("stat", "platform", os.platform());
                        socket.emit("stat", "release", os.release());
                        socket.emit("stat", "type", os.type());
                        socket.emit("stat", "version", process.version);
                        let prev1 = process.cpuUsage();
                        async function tick() {
                            let mem = process.memoryUsage();
                            prev1 = process.cpuUsage(prev1);
                            socket.emit("stat", "freemem", Math.round((os.freemem() / 1024 / 1024 / 1024) * 100) / 100);
                            socket.emit("stat", "totalmem", Math.round((os.totalmem() / 1024 / 1024 / 1024) * 100) / 100);
                            socket.emit("stat", "priority", os.getPriority());
                            socket.emit("stat", "home", os.homedir());
                            socket.emit("stat", "host", os.hostname());
                            socket.emit("stat", "tmp", os.tmpdir());
                            socket.emit("stat", "up", Math.round(os.uptime() / 6) / 10);
                            socket.emit("stat", "pup", Math.round(process.uptime() / 6) / 10);
                            socket.emit("stat", "cpuus", process.cpuUsage().user / 1000); //micro -> milli
                            socket.emit("stat", "cpuusp", prev1.user / 1000);
                            socket.emit("stat", "cpusy", process.cpuUsage().system / 1000);
                            socket.emit("stat", "cpusyp", prev1.system / 1000);
                            socket.emit("stat", "cwd", process.cwd());
                            socket.emit("stat", "rss", Math.round(100 * mem.rss / 1024 / 1024) / 100);
                            socket.emit("stat", "total1", Math.round(100 * mem.heapTotal / 1024 / 1024) / 100);
                            socket.emit("stat", "used1", Math.round(100 * mem.heapUsed / 1024 / 1024) / 100);
                            socket.emit("stat", "ext", Math.round(100 * mem.external / 1024 / 1024) / 100);
                            socket.emit("stat", "title", process.title);
                            socket.emit("stat", "port", process.debugPort);
                            return tick;
                        } //tick
                        setInterval(await tick(), panel.custping);
                    }
                });
                socket.on("error", async (err) => {
                    panel._debug(err);
                });
                socket.on("command", async (name, ...params) => {
                    params = params.map((param) => param === "$panel$" ? panel : param);
                    panel._debug(`Command:  ${name} ${params.slice(0, params.length - 1).join(' ')}  -->`);
                    let out = await panel.cmds.find((cmd) => cmd.name === name).body(...params);
                    panel._debug(`  ${out}`);
                    params[params.length - 1](out);
                });
                socket.on("cli", async (comm) => panel.rl.write(comm + os.EOL));
            }
            else {
                socket.disconnect(true);
            }
        });
        return admin;
    } //setup
    Socket.setup = setup;
})(Socket = exports.Socket || (exports.Socket = {})); //Socket
exports.default = Socket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7OztBQUdiLHFEQUErQjtBQUMvQixtREFBNkI7QUFDN0IsK0NBQXlCO0FBRXpCLElBQWMsTUFBTSxDQWlJbkI7QUFqSUQsV0FBYyxNQUFNO0lBRW5COzs7Ozs7Ozs7T0FTRztJQUNILFNBQWdCLEtBQUssQ0FBQyxFQUFtQixFQUFFLEtBQW9CO1FBQzlELElBQUksS0FBSyxHQUF1QixFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUM5QyxLQUFLLEdBQVksS0FBSyxFQUN0QixJQUFxQixDQUFDO1FBRXZCLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQVcsRUFBaUIsRUFBRTtZQUMxRCxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFXLEVBQWlCLEVBQUU7WUFDL0QsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQW9CLEVBQWlCLEVBQUU7WUFDckUsSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLElBQUksSUFBSSxHQUFnQixJQUFJLEdBQUcsQ0FB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QU4sY0FBTSxLQUFOLGNBQU0sUUFpSW5CLENBQUMsUUFBUTtBQUVWLGtCQUFlLE1BQU0sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgQ2xhc3NlcyBmcm9tICcuL0NsYXNzZXMnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcblxuZXhwb3J0IG1vZHVsZSBTb2NrZXQge1xuXG5cdC8qKlxuXHQgKiBXcmFwcGVyIGZvciBzZXR0aW5nIHVwIHRoZSBTb2NrZXQuXG5cdCAqIFxuXHQgKiBAYXV0aG9yIFYuIEguXG5cdCAqIEBkYXRlIDIwMTktMDUtMTJcblx0ICogQGV4cG9ydFxuXHQgKiBAcGFyYW0ge1NvY2tldElPLlNlcnZlcn0gaW9cblx0ICogQHBhcmFtIHtDbGFzc2VzLlBhbmVsfSBwYW5lbFxuXHQgKiBAcmV0dXJucyB7U29ja2V0SU8uTmFtZXNwYWNlfVxuXHQgKi9cblx0ZXhwb3J0IGZ1bmN0aW9uIHNldHVwKGlvOiBTb2NrZXRJTy5TZXJ2ZXIsIHBhbmVsOiBDbGFzc2VzLlBhbmVsKTogU29ja2V0SU8uTmFtZXNwYWNlIHtcblx0XHRsZXQgYWRtaW46IFNvY2tldElPLk5hbWVzcGFjZSA9IGlvLm9mKFwiL2FkbWluXCIpLFxuXHRcdFx0bG9naW46IGJvb2xlYW4gPSBmYWxzZSxcblx0XHRcdGxhZG06IFNvY2tldElPLlNvY2tldDtcblxuXHRcdHBhbmVsLm9uKFwiX2RlYnVnXCIsIGFzeW5jICguLi5kYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKGxhZG0pIGxhZG0uZW1pdChcIl9kZWJ1Z1wiLCAuLi5kYXRhKTtcblx0XHR9KTtcblx0XHRwYW5lbC5zZXJ2Lm9uKFwiX2RlYnVnXCIsIGFzeW5jICguLi5kYXRhOiBhbnlbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0aWYgKGxhZG0pIGxhZG0uZW1pdChcIl9zX2RlYnVnXCIsIC4uLmRhdGEpO1xuXHRcdH0pO1xuXHRcdHBhbmVsLnN0YXRlci5vbihcInNuYXBcIiwgYXN5bmMgKHJlZzogQ2xhc3Nlcy5TbmFwUmVnKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRpZiAobGFkbSkgbGFkbS5lbWl0KFwic25hcFwiLCByZWcpO1xuXHRcdH0pO1xuXHRcdGlmIChwYW5lbC5yZWZyZXNoKSB7XG5cdFx0XHRsZXQgZW5kczogU2V0PHN0cmluZz4gPSBuZXcgU2V0KFtcblx0XHRcdFx0XCIuaHRtXCIsXG5cdFx0XHRcdFwiLmh0bWxcIixcblx0XHRcdFx0XCIuaHRteFwiLFxuXHRcdFx0XHRcIi5odG1seFwiLFxuXHRcdFx0XHRcIi5qc1wiLFxuXHRcdFx0XHRcIi54anNcIixcblx0XHRcdFx0XCIuY3NzXCIsXG5cdFx0XHRcdFwiLmNzc3hcIlxuXHRcdFx0XSk7XG5cblx0XHRcdGZzLndhdGNoKHBhdGguam9pbihwYW5lbC5zZXJ2Lm9wdHMuc2VydmVEaXIsIHBhbmVsLnNlcnYub3B0cy5wdWJsaWMpLCB7XG5cdFx0XHRcdHJlY3Vyc2l2ZTogdHJ1ZVxuXHRcdFx0fSwgKGV2dDogc3RyaW5nLCBmaWxlOiBzdHJpbmcpOiB2b2lkID0+IHtcblx0XHRcdFx0aWYgKHBhbmVsLnJlZnJlc2ggJiYgQXJyYXkuZnJvbShlbmRzLnZhbHVlcygpKS5zb21lKGVuZCA9PiBmaWxlLmVuZHNXaXRoKGVuZCkpKSB7XG5cdFx0XHRcdFx0cGFuZWwuX2RlYnVnKFwiUmVmcmVzaGluZy4uLlwiKTtcblx0XHRcdFx0XHRhZG1pbi5lbWl0KFwicmVmcmVzaFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdFxuXHRcdGFkbWluLm9uKFwiY29ubmVjdFwiLCBhc3luYyAoc29ja2V0OiBTb2NrZXRJTy5Tb2NrZXQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdHBhbmVsLl9kZWJ1Zyhzb2NrZXQuaWQgKyBcIiBjb25uZWN0ZWQuXCIpO1xuXHRcdFx0c29ja2V0Lm9uY2UoXCJkaXNjb25uZWN0aW5nXCIsIGFzeW5jIChyZWFzb246IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0XHRwYW5lbC5fZGVidWcoc29ja2V0LmlkICsgXCIgZGlzY29ubmVjdGluZyAgXCIgKyByZWFzb24pO1xuXHRcdFx0XHRsb2dpbiA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghbG9naW4pIHsgIC8vdXNlciBhbHJlYWR5IGluc2lkZSBhbmQgcGFzcyBjaGFuZ2VkPz8gdnVsbmVyYWJsZVxuXHRcdFx0XHRzb2NrZXQuam9pbihcImFkbWluXCIsIGFzeW5jIChlcnI6IEVycm9yKTogUHJvbWlzZTx2b2lkPiA9PiB7XG5cdFx0XHRcdFx0aWYgKCFlcnIpIHtcblx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwiX2RlYnVnXCIsIHBhbmVsLl9kZWJ1Z2xvZyk7XG5cdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcIl9zX2RlYnVnXCIsIHBhbmVsLnNlcnYuX2RlYnVnbG9nKTtcblx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwiY2xpXCIsIHBhbmVsLl9ybGxvZyk7XG5cblx0XHRcdFx0XHRcdGZvciAobGV0IHNuYXAgb2YgcGFuZWwuc3RhdGVyLnNhbXBsZXMpIHtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzbmFwXCIsIHNuYXApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcImpvaW5lZFwiLCBcImFkbWluXCIpO1xuXHRcdFx0XHRcdFx0cGFuZWwuX2RlYnVnKGAke3NvY2tldC5pZH0gaXMgYWRtaW4uYCk7XG5cdFx0XHRcdFx0XHRsb2dpbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRsYWRtID0gc29ja2V0O1xuXG5cdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJhcmNoXCIsIG9zLmFyY2goKSk7XG5cdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJjcHVzXCIsIG9zLmNwdXMoKS5sZW5ndGgpO1xuXHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwiZW5kaWFuXCIsIG9zLmVuZGlhbm5lc3MoKSk7XG5cdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJwbGF0Zm9ybVwiLCBvcy5wbGF0Zm9ybSgpKTtcblx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcInJlbGVhc2VcIiwgb3MucmVsZWFzZSgpKTtcblx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcInR5cGVcIiwgb3MudHlwZSgpKTtcblx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcInZlcnNpb25cIiwgcHJvY2Vzcy52ZXJzaW9uKTtcblxuXHRcdFx0XHRcdFx0bGV0IHByZXYxOiBOb2RlSlMuQ3B1VXNhZ2UgPSBwcm9jZXNzLmNwdVVzYWdlKCk7XG5cblx0XHRcdFx0XHRcdGFzeW5jIGZ1bmN0aW9uIHRpY2soKSB7XG5cdFx0XHRcdFx0XHRcdGxldCBtZW06IE5vZGVKUy5NZW1vcnlVc2FnZSA9IHByb2Nlc3MubWVtb3J5VXNhZ2UoKTtcblx0XHRcdFx0XHRcdFx0cHJldjEgPSBwcm9jZXNzLmNwdVVzYWdlKHByZXYxKTtcblxuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJmcmVlbWVtXCIsIE1hdGgucm91bmQoKG9zLmZyZWVtZW0oKSAvIDEwMjQgLyAxMDI0IC8gMTAyNCkgKiAxMDApIC8gMTAwKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwidG90YWxtZW1cIiwgTWF0aC5yb3VuZCgob3MudG90YWxtZW0oKSAvIDEwMjQgLyAxMDI0IC8gMTAyNCkgKiAxMDApIC8gMTAwKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwicHJpb3JpdHlcIiwgb3MuZ2V0UHJpb3JpdHkoKSk7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcImhvbWVcIiwgb3MuaG9tZWRpcigpKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwiaG9zdFwiLCBvcy5ob3N0bmFtZSgpKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwidG1wXCIsIG9zLnRtcGRpcigpKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwidXBcIiwgTWF0aC5yb3VuZChvcy51cHRpbWUoKSAvIDYpIC8gMTApO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJwdXBcIiwgTWF0aC5yb3VuZChwcm9jZXNzLnVwdGltZSgpIC8gNikgLyAxMCk7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcImNwdXVzXCIsIHByb2Nlc3MuY3B1VXNhZ2UoKS51c2VyIC8gMTAwMCk7ICAvL21pY3JvIC0+IG1pbGxpXG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcImNwdXVzcFwiLCBwcmV2MS51c2VyIC8gMTAwMCk7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcImNwdXN5XCIsIHByb2Nlc3MuY3B1VXNhZ2UoKS5zeXN0ZW0gLyAxMDAwKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwiY3B1c3lwXCIsIHByZXYxLnN5c3RlbSAvIDEwMDApO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJjd2RcIiwgcHJvY2Vzcy5jd2QoKSk7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KFwic3RhdFwiLCBcInJzc1wiLCBNYXRoLnJvdW5kKDEwMCAqIG1lbS5yc3MgLyAxMDI0IC8gMTAyNCkgLyAxMDApO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJ0b3RhbDFcIiwgTWF0aC5yb3VuZCgxMDAgKiBtZW0uaGVhcFRvdGFsIC8gMTAyNCAvIDEwMjQpIC8gMTAwKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwidXNlZDFcIiwgTWF0aC5yb3VuZCgxMDAgKiBtZW0uaGVhcFVzZWQgLyAxMDI0IC8gMTAyNCkgLyAxMDApO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJleHRcIiwgTWF0aC5yb3VuZCgxMDAgKiBtZW0uZXh0ZXJuYWwgLyAxMDI0IC8gMTAyNCkgLyAxMDApO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdChcInN0YXRcIiwgXCJ0aXRsZVwiLCBwcm9jZXNzLnRpdGxlKTtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoXCJzdGF0XCIsIFwicG9ydFwiLCBwcm9jZXNzLmRlYnVnUG9ydCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aWNrO1xuXHRcdFx0XHRcdFx0fSAvL3RpY2tcblxuXHRcdFx0XHRcdFx0c2V0SW50ZXJ2YWwoYXdhaXQgdGljaygpLCBwYW5lbC5jdXN0cGluZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c29ja2V0Lm9uKFwiZXJyb3JcIiwgYXN5bmMgKGVycjogRXJyb3IpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRcdFx0XHRwYW5lbC5fZGVidWcoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvY2tldC5vbihcImNvbW1hbmRcIiwgYXN5bmMgKG5hbWU6IHN0cmluZywgLi4ucGFyYW1zOiBhbnlbXSk6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdFx0XHRcdHBhcmFtcyA9IHBhcmFtcy5tYXAoKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcgfCBDbGFzc2VzLlBhbmVsID0+IHBhcmFtID09PSBcIiRwYW5lbCRcIiA/IHBhbmVsIDogcGFyYW0pO1xuXHRcdFx0XHRcdHBhbmVsLl9kZWJ1ZyhgQ29tbWFuZDogICR7bmFtZX0gJHtwYXJhbXMuc2xpY2UoMCwgcGFyYW1zLmxlbmd0aCAtIDEpLmpvaW4oJyAnKX0gIC0tPmApO1xuXHRcdFx0XHRcdGxldCBvdXQgPSBhd2FpdCBwYW5lbC5jbWRzLmZpbmQoKGNtZDogQ2xhc3Nlcy5Db21tYW5kKTogYm9vbGVhbiA9PiBjbWQubmFtZSA9PT0gbmFtZSkuYm9keSguLi5wYXJhbXMpO1xuXHRcdFx0XHRcdHBhbmVsLl9kZWJ1ZyhgICAke291dH1gKTtcblx0XHRcdFx0XHRwYXJhbXNbcGFyYW1zLmxlbmd0aCAtIDFdKG91dCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzb2NrZXQub24oXCJjbGlcIiwgYXN5bmMgKGNvbW06IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4gcGFuZWwucmwud3JpdGUoY29tbSArIG9zLkVPTCkpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c29ja2V0LmRpc2Nvbm5lY3QodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gYWRtaW47XG5cdH0gLy9zZXR1cFxuXG59IC8vU29ja2V0XG5cbmV4cG9ydCBkZWZhdWx0IFNvY2tldDtcbiJdfQ==