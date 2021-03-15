package com.pannik.citeproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Attribute")
public class Attribute {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ATTR_ID")
	private Integer attrId;

	@NotNull
	@Size(min = 3, message = "Name must be atleast 3 characters")
	@Column(name = "ATTR_Name")
	private String attrName;
	@Column(name = "ATTR_Value")
	private String attrValue;

//	
//	
//	@ManyToMany(fetch = FetchType.LAZY, mappedBy   = "attributes")
//	private List<Employee> employees;

	public Attribute() {
		super();
	}

	public Attribute(Integer attrId, String attrName, String attrValue) {
		super();
		this.attrId = attrId;
		this.attrName = attrName;
		this.attrValue = attrValue;
	}

	public Attribute(Integer attrId, String attrName) {
		super();
		this.attrId = attrId;
		this.attrName = attrName;
	}

	public Integer getAttrId() {
		return attrId;
	}

	public void setAttrId(Integer attrId) {
		this.attrId = attrId;
	}

	public String getAttrName() {
		return attrName;
	}

	public void setAttrName(String attrName) {
		this.attrName = attrName;
	}

	public String getAttrValue() {
		return attrValue;
	}

	public void setAttrValue(String attrValue) {
		this.attrValue = attrValue;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((attrId == null) ? 0 : attrId.hashCode());
		result = prime * result + ((attrName == null) ? 0 : attrName.hashCode());
		result = prime * result + ((attrValue == null) ? 0 : attrValue.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Attribute other = (Attribute) obj;
		if (attrId == null) {
			if (other.attrId != null)
				return false;
		} else if (!attrId.equals(other.attrId))
			return false;
		if (attrName == null) {
			if (other.attrName != null)
				return false;
		} else if (!attrName.equals(other.attrName))
			return false;
		if (attrValue == null) {
			if (other.attrValue != null)
				return false;
		} else if (!attrValue.equals(other.attrValue))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Attribute [attrId=" + attrId + ", attrName=" + attrName + ", attrValue=" + attrValue + "]";
	}

//	public List<Employee> getEmployees() {
//		return employees;
//	}
//
//	public void setEmployees(List<Employee> employees) {
//		this.employees = employees;
//	}

}
