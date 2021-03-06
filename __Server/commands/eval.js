"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Classes = module.parent.exports.Classes;
exports.command = new Classes.Command({
    name: "eval",
    desc: "Evaluate JS expressions",
    exp: new RegExp('', "sim"),
    usage: "code<String>",
    _compl: '',
    _priority: Infinity,
    body: async function body(code) {
        return eval(code);
    },
    parse: function parse(line, panel) {
        return this.body(line);
    },
});
exports.default = exports.command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9jb21tYW5kcy9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBSW5DLFFBQUEsT0FBTyxHQUFlLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNwRCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSx5QkFBeUI7SUFDL0IsR0FBRyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUM7SUFDMUIsS0FBSyxFQUFFLGNBQWM7SUFDckIsTUFBTSxFQUFFLEVBQUU7SUFDVixTQUFTLEVBQUUsUUFBUTtJQUNuQixJQUFJLEVBQUUsS0FBSyxVQUFVLElBQUksQ0FBQyxJQUFZO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDRCxLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsSUFBWSxFQUFFLEtBQWdCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0QsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsZUFBTyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ2xhc3NlcyA9IG1vZHVsZS5wYXJlbnQuZXhwb3J0cy5DbGFzc2VzO1xuXG5pbXBvcnQgeyBDbGFzc2VzIGFzIENUIH0gZnJvbSBcIi4uL0NsYXNzZXNcIjtcblxuZXhwb3J0IHZhciBjb21tYW5kOiBDVC5Db21tYW5kID0gbmV3IENsYXNzZXMuQ29tbWFuZCh7XG5cdG5hbWU6IFwiZXZhbFwiLFxuXHRkZXNjOiBcIkV2YWx1YXRlIEpTIGV4cHJlc3Npb25zXCIsXG5cdGV4cDogbmV3IFJlZ0V4cCgnJywgXCJzaW1cIiksXG5cdHVzYWdlOiBcImNvZGU8U3RyaW5nPlwiLFxuXHRfY29tcGw6ICcnLFxuXHRfcHJpb3JpdHk6IEluZmluaXR5LFxuXHRib2R5OiBhc3luYyBmdW5jdGlvbiBib2R5KGNvZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG5cdFx0cmV0dXJuIGV2YWwoY29kZSk7XG5cdH0sIC8vYm9keVxuXHRwYXJzZTogZnVuY3Rpb24gcGFyc2UobGluZTogc3RyaW5nLCBwYW5lbD86IENULlBhbmVsKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gdGhpcy5ib2R5KGxpbmUpO1xuXHR9LCAvL3BhcnNlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZDtcbiJdfQ==