package com.pannik.citeproject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pannik.citeproject.exception.ResourceNotFoundException;
import com.pannik.citeproject.model.Attribute;
import com.pannik.citeproject.model.Employee;
import com.pannik.citeproject.repository.AttributeRepository;
import com.pannik.citeproject.repository.EmployeeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/")
public class AttributeController {
	@Autowired
	private AttributeRepository attributeRepository;
	@Autowired
	private EmployeeRepository employeeRepository;

	@GetMapping("/attributes")
	public List<Attribute> getAllAttributes() {
		return attributeRepository.findAll();
	}

	@PostMapping("/attributes")
	public Attribute createAttribute(@Valid @RequestBody Attribute attribute) {
		return attributeRepository.save(attribute);
	}

	@GetMapping("/attributes/{id}")
	public ResponseEntity<Attribute> getAttributeById(@PathVariable Integer id) {
		Attribute attribute = attributeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Attribute not exist with id:" + id));
		return ResponseEntity.ok(attribute);
	}

	@PutMapping("/attributes/{id}")
	public ResponseEntity<Attribute> updateAttribute(@PathVariable Integer id,
			@Valid @RequestBody Attribute attributeDetails) {
		Attribute attribute = attributeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Attribute not exist with id:" + id));
		attribute.setAttrName(attributeDetails.getAttrName());
		attribute.setAttrValue(attributeDetails.getAttrValue());

		Attribute updatedAttribute = attributeRepository.save(attribute);
		return ResponseEntity.ok(updatedAttribute);
	}

	@DeleteMapping("/attributes/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteAttribute(@PathVariable Integer id) {
		Attribute attribute = attributeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Attribute not exist with id:" + id));
		List<Employee> employees = employeeRepository.findAll();
		for (Employee e : employees) {
			List<Attribute> attributes = e.getAttributes();
			List<Attribute> attrs = new ArrayList<Attribute>();

			for (Attribute a : attributes) {
				if (a.getAttrId() != attribute.getAttrId()) {
					attrs.add(a);
				}
			}
			e.setAttributes(attrs);
		}
		attributeRepository.delete(attribute);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
