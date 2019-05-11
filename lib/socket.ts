"use strict";

import Classes from './Classes';
import * as fs from "fs-extra";
import * as path from "path";
import * as os from "os";

export module Socket {

	export function setup(io: SocketIO.Server, panel: Classes.Panel) {
		let admin = io.of("/admin"),
			login: boolean = false,
			ladm: SocketIO.Socket;

		panel.on("_debug", (...data: any[]) => {
			if (ladm) ladm.emit("_debug", ...data);
		});
		panel.serv.on("_debug", (...data: any[]) => {
			if (ladm) ladm.emit("_s_debug", ...data);
		});
		if (panel.refresh) {
			let ends: Set<string> = new Set([
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
		
		admin.on("connect", async socket => {
			panel._debug(socket.id + " connected.");
			socket.once("disconnecting", async reason => {
				panel._debug(socket.id + " disconnecting  " + reason);
				login = false;
			});

			if (!login) {
				socket.join("admin", async err => {
					if (!err) {
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
							socket.emit("stat", "up", Math.round(os.uptime() / 60 * 10) / 10);
							socket.emit("stat", "pup", Math.round(process.uptime() / 60 * 10) / 10);
							socket.emit("stat", "cpuus", process.cpuUsage().user / 1000);
							socket.emit("stat", "cpuusp", prev1.user / 1000);
							socket.emit("stat", "cpusy", process.cpuUsage().system / 1000);
							socket.emit("stat", "cpusyp", prev1.system / 1000);
							socket.emit("stat", "cwd", process.cwd());
							socket.emit("stat", "rss", Math.round(mem.rss / 1024 / 1024 * 100) / 100);
							socket.emit("stat", "total1", Math.round(mem.heapTotal / 1024 / 1024 * 100) / 100);
							socket.emit("stat", "used1", Math.round(mem.heapUsed / 1024 / 1024 * 100) / 100);
							socket.emit("stat", "ext", Math.round(mem.external / 1024 / 1024 * 100) / 100);
							return tick;
						} //tick

						setInterval(await tick(), panel.custping);
					}
				});
				socket.on("error", async err => {
					panel._debug(err);
				});
				socket.on("command", async (name, ...params) => {
					params = params.map(param => param === "$panel$" ? panel : param);
					panel._debug(`Command:  ${name} ${params.slice(0, params.length - 1).join(' ')}  -->`);
					let out = await panel.cmds.find(cmd => cmd.name === name).body(...params);
					panel._debug(`  ${out}`);
					params[params.length - 1](out);
				});
				socket.on("cli", async comm => panel.rl.write(comm + os.EOL));
			} else {
				socket.disconnect(true);
			}
		});

		return admin;
	} //setup

} //Socket

export default Socket;
