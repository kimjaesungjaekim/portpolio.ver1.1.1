package com.inno.portpolio.information.vo;

import javax.validation.constraints.NotBlank;

import com.inno.portpolio.common.validation.DeleteGroup;
import com.inno.portpolio.common.validation.InsertGroup;

import lombok.Data;
import lombok.EqualsAndHashCode;
/**
* @author 연구개발 5팀 사원 김재성
* @since 2024. 03. 08.
* @version 1.0
* @see javax.servlet.http.HttpServlet 
* <pre>
* [[개정이력(Modification Information)]]
*    수정일            수정자               수정내용
* ------------     --------    ----------------------
* 2024.03.08.        김재성       최초작성
* Copyright (c) 2024 by INNOVATION-T All right reserved
* </pre>
*/
@Data
@EqualsAndHashCode(of={"infoNo","cerNo"})
public class CertificateVO {
	
	@NotBlank(groups = {InsertGroup.class,DeleteGroup.class})
	private String infoNo;
	
	@NotBlank(groups = {InsertGroup.class,DeleteGroup.class})
	private String cerNo;
	
	@NotBlank(groups = {InsertGroup.class,DeleteGroup.class})
	private String cerNm;
	@NotBlank(groups = {InsertGroup.class,DeleteGroup.class})
	private String cerCode;
	
	private String cerAgency;
	@NotBlank(groups = {InsertGroup.class,DeleteGroup.class})
	private String cerDate;
}
