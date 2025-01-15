init();

// 초기 셋팅
function init() {
    // 버튼 이벤트 등록
    // 초기화 버튼
    $('button#init').on('click', function() {
        $('table#empInfo [name]').val('');
    })

    // 등록 버튼
    $('button#insert').on('click', insertEmp);

    // 수정 버튼
    $('button#update').on('click', updateEmp);

    // 삭제 버튼
    $('button#del').on('click', deleteEmp);

    // 전체 조회
    findAllEmpList();
}

function findAllEmpList() {
    $.ajax('http://192.168.0.11:8099/empList')
    .done(result => {
        $('#empList > tbody').empty();
        $.each(result, function(index, value) {
            addRow(value);
        });
    })
    .fail(error => console.log(error));
}

function addRow(info) {
    let trTag = $('<tr/>');
    trTag.on('click', findOneEmp);
    let tdTag;

    for(key of ['employeeId', 'lastName', 'jobId']) {
        tdTag = $('<td/>');
        tdTag.text(info[key]);
        trTag.append(tdTag);
    }

    $('#empList > tbody').append(trTag);
}

function findOneEmp(event) {
    let tdTag = $(event.currentTarget).children().first();

    $.ajax(`http://192.168.0.11:8099/empInfo?employeeId=${tdTag.text()}`)
    .done(result => {
        showEmpInfo(result);
    })
    .fail(error => console.log(error));
}

function showEmpInfo(info) {
    for(key of ['employeeId', 'lastName', 'email', 'hireDate', 'jobId']) {
        $(`#empInfo [name="${key}"]`).val(info[key]);
    }
}

function formEmpInfo() {
    let result = {}
    for(key of ['employeeId', 'lastName', 'email', 'hireDate', 'jobId']) {
        result[key] = $(`#empInfo [name="${key}"]`).val()
    }
    return result;
}

function insertEmp(event) {
    let empInfo = formEmpInfo();
    if(empInfo.employeeId != '') {
        console.log('insertion denied');
        return;
    }

    $.ajax(`http://192.168.0.11:8099/empInsert`, {
        method: 'POST',
        // contentType: 'application/x-www-form-urlencoded'
        data: empInfo
    })
    .done(result => {
        $('#empInfo [name="employeeId"]').val(result.employeeId);
        findAllEmpList();
    })
    .fail(error => console.log(error));
}

function updateEmp(event) {
    let empInfo = formEmpInfo();
    if(empInfo.employeeId == '') {
        console.log('update denied');
        return;
    }

    $.ajax(`http://192.168.0.11:8099/empUpdate?employeeId=${empInfo.employeeId}`, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(empInfo)
    })
    .done(result => {
        findAllEmpList();
    })
    .fail(error => console.log(error));
}

function deleteEmp(event) {
    let empId = $('#empInfo input[name="employeeId"]').val();
    if(empId == '') {
        console.log('deletion denied');
        return;
    }

    $.ajax(`http://192.168.0.11:8099/empDelete?employeeId=${empId}`)
    .done(result => {
        findAllEmpList();
    })
    .fail(error => console.log(error));
}