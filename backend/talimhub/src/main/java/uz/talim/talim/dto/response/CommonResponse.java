package uz.talim.talim.dto.response;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;

import java.util.HashMap;
import java.util.Map;

public class CommonResponse<T> {
    private final Map<String, T> properties = new HashMap<>();

    @JsonAnySetter
    public void add(String key, T value) {
        properties.put(key, value);
    }

    @JsonAnyGetter
    public Map<String, T> getProperties() {
        return properties;
    }

    public void clearProperties(){
        this.properties.clear();
    }
}
