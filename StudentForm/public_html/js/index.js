/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName = "SCHOOL-DB";
var stdRelationName = "STUDENT-TABLE";
var connToken = "90931814|-31949306622965223|90960655";
$("#stdRoll").focus();

function saveRecNo(jsonObj){
    var lvData= JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}

function getStdIdAsJsonObj(){
    var stdRollVar=$("#stdRoll").val();
    var jsonStrObj={
        stdRoll: stdRollVar
    };
    return JSON.stringify(jsonStrObj);
}

function fillData(jsonObj){
    saveRecNo(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#stdName").val(record.name);
    $("#stdClass").val(record.class);
    $("#stdBirth").val(record.birth);
    $("#stdClass").val(record.class);
    $("#stdAddress").val(record.address);
    $("#stdEnroll").val(record.enroll);
}

function resetForm() {
    $("#stdRoll").val("");
    $("#stdName").val("");
    $("#stdClass").val("");
    $("#stdBirth").val("");
    $("#stdAddress").val("");
    $("#stdEnroll").val("");
    $("#stdRoll").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stdRoll").focus();
}

function validateAndGetFormData() {
    var stdRollVar = $("#stdRoll").val();
    if (stdRollVar === "") {
        alert("Student Roll Number Required Value");
        $("#stdRoll").focus();
        return "";
    }
    var stdNameVar = $("#stdName").val();
    if (stdNameVar === "") {
        alert("Student Name is Required Value");
        $("#stdName").focus();
        return "";
    }
    var stdClassVar = $("#stdClass").val();
    if (stdClassVar === "") {
        alert("Class is Required Value");
        $("#stdClass").focus();
        return "";
    }
    var stdBirthVar = $("#stdBirth").val();
    if (stdBirthVar === "") {
        alert("Date of Birth is Required Value");
        $("#stdBirth").focus();
        return "";
    }
    var stdAddressVar = $("#stdAddress").val();
    if (stdAddressVar === "") {
        alert("Address is Required Value");
        $("#stdAddress").focus();
        return "";
    }
    var stdEnrollVar = $("#stdEnroll").val();
    if (stdEnrollVar === "") {
        alert("Date of Enrollment is Required Value");
        $("#stdEnroll").focus();
        return "";
    }
    var jsonStrObj = {
        stdRoll: stdRollVar,
        stdName: stdNameVar,
        stdClass: stdClassVar,
        stdBirth: stdBirthVar,
        stdAddress: stdAddressVar,
        stdEnroll: stdEnrollVar

    };
    return JSON.stringify(jsonStrObj);
}

function getStd() {
    var stdIdJsonObj = getStdIdAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
  
    if (resJsonObj.status === 400){
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("$stdName").focus();

    }
    else if (resJsonObj.status === 200) {

    $("#stdId"),prop("disabled",true);
    fillData(resJsonObj);

    $("#change").prop("disabled",false);
    $("#reset").prop("disabled", false);
    $("#stdName").focus();
}
}

function saveStudent() {
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === '') {
        return "";
    }
    var putReqStr = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stdRoll").focus();
}

function changeStudent() {
    $("#change").prop("disabled", true);
    jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stdDBName, stdRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("stdRoll").focus();
}









