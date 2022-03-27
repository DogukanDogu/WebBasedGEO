/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.cbs.geojsonserver.service;

import com.cbs.geojsonserver.dao.GeojsonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author dogu8
 */
@Service
public class GeojsonService {
    
    @Autowired GeojsonDao geojsonDao;
    
    public String getPoints(){
        return this.geojsonDao.getPoints();
    }
    
    public String getLinestrings(){
        return this.geojsonDao.getLinestrings();
    }
    
    public String getPolygons(){
        return this.geojsonDao.getPolygons();
    }
    
    public String getPointPolygons(String city){
        return this.geojsonDao.getPointPolygons(city);
    }
    
}