package com.compiler.enums;

public enum Language {

	C("c"), CPP("cpp"), JAVA("java");

	private String	dirName;

	Language(String dir){
		this.dirName = dir;
	}

	public String getDirName() {
		return dirName;
	}

	public void setDirName(String dirName) {
		this.dirName = dirName;
	}
}
