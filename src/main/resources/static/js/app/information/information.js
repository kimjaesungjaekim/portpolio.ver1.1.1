/**
 * 
 * 
 * @author 연구개발 5팀 사원 김재성
 * @since 2024. 03. 08.
 * @version 1.0
 * @see javax.servlet.http.HttpServlet
 * 
 *      <pre>
 * [[개정이력(Modification Information)]]
 *    수정일            수정자               수정내용
 * ------------     --------    ----------------------
 * 2024.03.08.        김재성       최초작성
 * 2024.03.11.        김재성       경력 학력 자격증 기술 추가 삭제
 * Copyright (c) 2024 by INNOVATION-T All right reserved
 *      </pre>
 */

 $(function(){
	 
	// ----------------- 기본정보 -----------------------------
	$("#profileInformationBtn").on("click",function(){
		
		//alert("수정하기");
			
		$("#profileModal").show();
	});
	
	$("#profileInformationModalClose").on("click",function(){
		$("#profileModal").hide();
		$("#profileModifyForm input").val('');
		$("#profileModifyForm textarea").val('');
	}); 
	
	$("#profileModifyForm").on("submit",function(event){
		event.preventDefault();
		
		//let data = $(this).serialize();
		let data = {
	        useNm: $("#useNm").val(),
	        useTel: $("#useTel").val(),
	        useEmail: $("#useEmail").val(),
	        useIntroduce: $("#useIntroduce").val(),
    	};
		
		console.log("data", data);
		
		$.ajax({
			url : "/information/modify",
			method : "POST",
			data : JSON.stringify(data) ,
//			data : formData ,
			dataType : 'json',
			contentType: 'application/json',
			success : function(resp){
				if(resp.result =="OK"){
					alert(resp.message);
					location.reload();
				}else{
					alert(resp.message);
				}
			},
			error : function(xhr, status,err){
				console.log("상태 : ", status);
				console.log("에러 : ", err);
				alert("잘못된 요청 발생 !");
			}
		});
	});
	
	// ----------------- 경력  ------------------------
    $("#careerAddModalBtn").on("click",function(){
			
		$("#careerModal").show();
	});
	
	$("#careerAddModalClose").on("click",function(){
		$("#careerModal").hide();
		$("#careerAddModalForm input").val('');
	});
	
	$("#careerAddModalForm").on("submit",function(event){
		event.preventDefault();
		
		//let data = $(this).serialize();
		let data = {
	        carNm: $("#carNm").val(),
	        carSpot: $("#carSpot").val(),
	        carBeginDate: $("#carBeginDate").val(),
	        carEndDate: $("#carEndDate").val(),
    	};
		
		console.log("data", data);
		
		$.ajax({
			url : "/information/career/add",
			method : "POST",
			data : JSON.stringify(data) ,
//			data : formData ,
			dataType : 'json',
			contentType: 'application/json',
			success : function(resp){
				if(resp.result =="OK"){
					alert(resp.message);
					location.reload();
				}else{
					alert(resp.message);
				}
			},
			error : function(xhr, status,err){
				console.log("상태 : ", status);
				console.log("에러 : ", err);
				alert("잘못된 요청 발생 !");
			}
		});
	});
	
	$("#careerRemoveBtn").on("click",function(){
		
			let careerChekced = $("#careerDiv input[name='selectedCareer']:checked");
			
			let careerVaules = [];
			
			careerChekced.each(function(){
				  careerVaules.push($(this).val());
			});
			
			console.log("선택된 경력 value 값들 확인 : " + careerVaules);
			
			if (confirm("선택하신 경력 정보를 삭제 하시겠습니까?")) {
			    console.log("사용자가 확인을 선택했습니다. 경력 정보를 삭제합니다.");
			    
			    $.ajax({
		//			url : `/information/career/remove?careerVaules=${encodeURIComponent(JSON.stringify(careerVaules))}`,
					url : '/information/career/remove',
					type : "POST",
		//			data: {careerVaules:careerVaules}, // 배열을 전달
					data : JSON.stringify(careerVaules) ,
					dataType : 'json',
					contentType: 'application/json',
					success : function(resp){
						if(resp.result =="OK"){
							alert(resp.message);
							location.reload();
						}else{
							alert(resp.message);
						}
					},
					error : function(xhr, status,err){
						console.log("상태 : ", status);
						console.log("에러 : ", err);
						alert("잘못된 요청 발생 !");
					}
				});
			    
			}else {
			    $("#careerDiv input[name='selectedCareer']").prop('checked', false);
			}
	});
 });