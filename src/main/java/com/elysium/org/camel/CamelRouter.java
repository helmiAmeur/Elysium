package com.elysium.org.camel;


import com.elysium.org.service.BoardService;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CamelRouter extends RouteBuilder {
	@Autowired
	private BoardService boardService ;
	@Override
	public void configure() throws Exception {
      from("timer:stat-timer?period=1h")
			.bean(boardService,"findAll()")
			  .log("${body}")
		   .to("log:stat-timer");
	}
}
