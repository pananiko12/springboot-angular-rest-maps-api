package com.pannik.citeproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pannik.citeproject.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
