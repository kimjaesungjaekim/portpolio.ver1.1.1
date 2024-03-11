package com.inno.portpolio.user.service.Impl;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inno.portpolio.common.enumpkg.ServiceResult;
import com.inno.portpolio.user.mapper.UsersMapper;
import com.inno.portpolio.user.service.UsersService;
import com.inno.portpolio.user.vo.AuthorityVO;
import com.inno.portpolio.user.vo.UsersVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
/**
* @author 연구개발 5팀 사원 김재성
* @since 2024. 03. 07.
* @version 1.0
* @see javax.servlet.http.HttpServlet 
* <pre>
* [[개정이력(Modification Information)]]
*    수정일            수정자               수정내용
* ------------     --------    ----------------------
* 2023.12.02.        김재성       최초작성
* Copyright (c) 2024 by INNOVATION-T All right reserved
* </pre>
*/
@Service
@RequiredArgsConstructor
@Slf4j
public class UsersServiceImpl implements UsersService {
	
	private final UsersMapper usersMapper;
	
	private final PasswordEncoder passwordEncoder;
	
	@Override
	@Transactional
	public ServiceResult register(UsersVO user) {
		
		String inputPassword = user.getUsePw();
		String encodePassword = passwordEncoder.encode(inputPassword);
		user.setUsePw(encodePassword);
		
		AuthorityVO authVO = new AuthorityVO();
		authVO.setUseId(user.getUseId());
		authVO.setAuthNm("ROLE_USER");
		
		
		ServiceResult result;
		int cnt =0;
		
			cnt = usersMapper.register(user);
			
			Map<String, Object> users =usersMapper.loadUserByUsername(user.getUseId());
			
			if(cnt >0) {
				result = ServiceResult.OK;
				cnt += usersMapper.authorityRegister(authVO);
				
			}else if(users.get("USE_ID").equals(user.getUseId())) {
				result = ServiceResult.DUPLICATED;
				throw new RuntimeException("아이디가 중복 됩니다. 다시 입력해주세요.");
			}else {
				result = ServiceResult.FAIL;
				throw new RuntimeException("회원가입이 불가능 합니다. 다시 시도해주세요.");
			}
			
		return result;
	}

}
