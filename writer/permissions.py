from rest_framework import permissions

class IsOwnerOrDeny(permissions.BasePermission):
    """
    Custom permission to show the objects only to their respective owners
    """
    def has_object_permission(self, request, view, obj):
        # Any Method will not be allowed
        # Only the below condition becomes true 
        return obj.user == request.user