package api

import "testing"

func TestIsIPInCIDRRange(t *testing.T) {
	cidr := []string{"192.168.0.1/25", "192.168.1.1/25"}

	ipInRange := "192.168.1.1"
	if !isIPInCIDRRange(ipInRange, cidr) {
		t.Errorf("Expected IP %v to be within CIDRs %v", ipInRange, cidr)
	}

	ipOutsideRange := "8.8.8.8"
	if isIPInCIDRRange(ipOutsideRange, cidr) {
		t.Errorf("Expected IP %v to be outside CIDRs %v", ipOutsideRange, cidr)
	}
}
