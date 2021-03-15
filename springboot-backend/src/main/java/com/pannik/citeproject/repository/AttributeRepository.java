package com.pannik.citeproject.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pannik.citeproject.model.Attribute;

@Repository
public interface AttributeRepository extends JpaRepository<Attribute, Integer>{




}
