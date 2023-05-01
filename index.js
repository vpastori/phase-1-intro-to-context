// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeArray => createEmployeeRecord(employeeArray));
}

function createTimeInEvent(EmployeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    EmployeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return EmployeeRecord;
}

function createTimeOutEvent(EmployeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    EmployeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return EmployeeRecord;
}

function hoursWorkedOnDate(EmployeeRecord, date) {
    const timeInEvent = EmployeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = EmployeeRecord.timeOutEvents.find(event => event.date === date);

    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;

    const hoursWorked = (timeOut - timeIn) / 100;

    return hoursWorked;
}

function wagesEarnedOnDate(EmployeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(EmployeeRecord, date);
    const payRate = EmployeeRecord.payPerHour;

    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
}

function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    let wages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employee, date);
    }, 0);
    return wages;
}

function calculatePayroll(employees) {
    let totalPay = 0;
    for (let employee of employees) {
        totalPay += allWagesFor(employee);
    }
    return totalPay;
}