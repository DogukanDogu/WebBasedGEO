/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.cbs.geojsonserver.controller;

import com.cbs.geojsonserver.service.GeojsonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author dogu8
 */
@RestController
@RequestMapping(value = "/geojson", produces = {MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8"})
public class GeojsonController {
    
    @Autowired GeojsonService geojsonService;
    
    @RequestMapping(value = "/getPoints", method = RequestMethod.GET)
    public String getPoints(){
        return this.geojsonService.getPoints();
    }
    
    @RequestMapping(value = "/getLinestrings", method = RequestMethod.GET)
    public String getLinestrings(){
        return this.geojsonService.getLinestrings();
    }
    
    @RequestMapping(value = "/getPolygons", method = RequestMethod.GET)
    public String getPolygons(){
        return this.geojsonService.getPolygons();
    }
    
    @RequestMapping(value = "/getPointPolygons", method = RequestMethod.GET)
    public String getPointPolygons(@RequestParam("city") String city){
        return this.geojsonService.getPointPolygons(city);
    }
    
}
